const MemberRepository = require('../repository/MemberRepo');  // Assuming this path

const bcrypt = require('bcryptjs');

class MemberService {
    static async getAllMembers({ page, pageSize, search }) {
        return await MemberRepository.getAllMembers({ page, pageSize, search });
    }

    static async getMemberById(id) {
        return await MemberRepository.getMemberById(id);
    }

    static async getMemberByUsername(username) {
        return await MemberRepository.getMemberByUsername(username);
    }

    static async getMemberByEmail(email) {
        return await MemberRepository.getMemberByEmail(email);
    }

    static async createMember(data) {
        return await MemberRepository.createMember(data);
    }

    static async updateMember(id, data) {
        return await MemberRepository.updateMember(id, data);
    }

    static async deleteMember(id) {
        return await MemberRepository.deleteMember(id);
    }

    static async getIdFromEmail(email) {
        const member = await this.getMemberByEmail(email);
        return member?.id || null;
    }

    static async getUsernameFromEmail(email){
        const member = await this.getMemberByEmail(email);
        return member.username
    }

    static async setMemberPassword(password, id) {
        const pw = await bcrypt.hash(password, 10);
        const result = await MemberRepository.setMemberPassword(pw, id);
        return result;
    }

    static async addMember(password, username, email){
        const pw = await bcrypt.hash(password, 10);
        const result = await MemberRepository.addMember(username, email, pw)
        return result;
    }

    // Test a submitted password against a stored password
    static async authenticate(submitted, username) {
        // Get the stored, hashed password for the user
        const result = await this.getMemberByUsername(username);
        const match = await bcrypt.compare(submitted, result.password);
        return match;
    }

    async hashPassword(member){
        const saltRounds = 10;
        this.password = await bcrypt.hash(member.password, saltRounds);
    }

    async comparePassword(inputPassword, member){
        return await bcrypt.compare(inputPassword, member.password);
    }
}

module.exports = MemberService;
